import {
    APP_SET_PAGINATION_ACTION,
    DATASET_WIND_SPEED_GABLE_SHED_TS61_64, 
    DATASET_WIND_SPEED_GABLE_SHED_TS96_TS120, 
    DATASET_WIND_SPEED_GABLE_SHED_KNEE_BRACE,
    DATASET_WIND_SPEED_GABLE_SHED_KNEE_BRACE_AND_COLLAR_TIE,
    DATASET_WIND_SPEED_SKILLION_SHED,
    DATASET_WIND_SPEED_SKILLION_SHED_KNEE_BRACE,
    DATASET_WIND_SPEED_SKILLION_CARPORT,
    DATASET_WIND_SPEED_GABLE_CARPORT,
    PAGINATION_ITEMS_PER_PAGE,
    PREDEFINED_AUSTRALIAN_STATES,
    PRODUCT_TYPES,
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_GABLE_CARPORTS,
    PRODUCT_CATEGORY_SKILLION_SHEDS
} from "../constants";
import {httpClient, httpClient2} from "./index";
import FormData from 'form-data';

let utils = {
    getModuleAbsLink(modName) {
        let absLink = window.location.href;
        return absLink.substring(0, absLink.indexOf(`/${modName}/`) + modName.length + 2);
    },

    /**
     * Get array of item list in the normalized state tree. Mostly used in the list selector.
     *
     * @param currentSelectedState
     * @param itemSchemaIdentification
     * @returns {null}
     */
    getItemListInStateTree(currentSelectedState, itemSchemaIdentification) {
        if (currentSelectedState.result)
            return currentSelectedState.result.map(id =>
                currentSelectedState.entities[itemSchemaIdentification][id]
            );
        else
            return null;
    },

    /**
     * Factory function for calling LIST API for an endpoint.
     *  - Filter must be built before passing to payload.
     *      + E.g. $or[0][agentName][$like]=%25900%25&$or[1][businessNumber][$like]=%25900%25
     *
     * @param payload
     * @returns {AxiosPromise<any>}
     *
     * Data shape:
     {
         data: [{…}, {…}, {…}, {…}, {…}]
         limit: 5
         skip: 0
         total: 9
     }
     */
    callAPIListFor(apiSubEndPoint) {
        const callLoadListAPI = (payload) => {
            let {limit, skip, sortBy, sortDir, filter} = payload;
            if (!limit)
                limit = PAGINATION_ITEMS_PER_PAGE;
            if (!sortBy)
                sortBy = 'id';
            if (!sortDir)
                sortDir = -1;
            if (!skip || skip < 0)
                skip = 0;

            let apiUrl = `${apiSubEndPoint}?$sort[${sortBy}]=${sortDir}&$limit=${limit}&$skip=${skip}`;
            if (filter)
                apiUrl += filter;
            return httpClient.get(apiUrl);
        };
        return callLoadListAPI;
    },

    callAPIListFor2(apiSubEndPoint) {
        const callLoadListAPI = (payload) => {
            let {limit, skip, sortBy, sortDir, filter} = payload;
            if (!limit)
                limit = PAGINATION_ITEMS_PER_PAGE;
            if (!sortBy)
                sortBy = 'id';
            if (!sortDir)
                sortDir = -1;
            if (!skip || skip < 0)
                skip = 0;

            let apiUrl = `${apiSubEndPoint}?sort[${sortBy}]=${sortDir}&limit=${limit}&skip=${skip}`;
            if (filter)
                apiUrl += filter;
            // filter && Object.keys(filter).map(key => {
            //     apiUrl += "&" + key + "=" + filter[key];
            // })
            return httpClient2.get(apiUrl);
        };
        return callLoadListAPI;
    },

    /**
     * Upload a single file to remote
     * @param file
     */
    uploadFile(file, subPath = null){
        let data = new FormData();
        data.append('uri', file, file.fileName);
        httpClient.defaults.headers.common['accept'] = 'application/json';
        httpClient.defaults.headers.common['Accept-Language'] = 'en-US,en;q=0.8';
        httpClient.defaults.headers.common['Content-Type'] = `multipart/form-data; boundary=${data._boundary}`;
        let uploadURL = '/upload';
        if (subPath)
            uploadURL += `?subPath=${subPath}`;
        //return httpClient.post(uploadURL, data);
        return httpClient2.post(uploadURL, data);
    },

    /**
     * Pagination reducer factory: To simplify the pagination work by adding pagination into combineReducer
     *
     * --> NOT USED YET
     *
     * @param prefix
     * @returns {function(*=, *)}
     */
    paginationReducerFor(prefix){
        const initialPaginationState = {
            skip: 0,
            limit: 100,
            total: 0,
        };
        const paginationReducer = (state = initialPaginationState, action) => {
            const { type, payload } = action;
            switch (type) {
                case prefix + APP_SET_PAGINATION_ACTION:
                    const {
                        total,
                        limit,
                        skip,
                    } = payload;
                    return Object.assign({}, state, {
                        total,
                        limit,
                        skip,
                    });
                default:
                    return state;
            }
        };
        return paginationReducer;
    },

    /**
     * Display address based on number, street, city, state and postcode
     *
     * @param contactObj
     * @returns {string}
     */
    getAddressDisplaying(contactObj) {
        let arr1 = [], arr2 = [];
        if (contactObj && contactObj.addressNumber && contactObj.addressStreet)
            arr1.push(contactObj.addressNumber + ' ' + contactObj.addressStreet);
        if (contactObj && contactObj.addressCity)
            arr2.push(contactObj.addressCity);
        if (contactObj && contactObj.addressState) {
            const state = PREDEFINED_AUSTRALIAN_STATES.find(item => (item.abbreviation === contactObj.addressState));
            if (state)
                arr2.push(state.name);
            else
                arr2.push(contactObj.addressState);
        }
        if (contactObj && contactObj.addressPostcode)
            arr2.push(contactObj.addressPostcode);
        return arr1.join(', ') + '<br />' + arr2.join(', ');
    },

    /**
     * Calculate Wind Speed based on dataset table
     *
     * @param MaxShedSpan   find nearest max value. E.g. 5999 will return 6000
     * @param MaxShedHeight find nearest max value
     * @param MinShedPitch  find nearest min value
     * @param MaxShedPitch  find nearest max value
     * @param MaxBaySpacing find nearest max value
     * @param WindSpeed     Fixed value
     * @param Qu            Fixed value
     *
     * @return a JSON object
     */
    lookupWindSpeed({MaxShedSpan, MaxShedHeight, MaxShedLength, MaxBaySpacing,
                        WindSpeedAutoCalc, Cpi, purlinAndGirtType, hasKneeBrace, hasCollarTie, productId}) {

        let obj;
        let dataSet;
        const currentProduct = PRODUCT_TYPES.find(item => item.id === Number(productId));
        const isSkillionCarport = (currentProduct && currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS);
        const isGableCarport = (currentProduct && currentProduct.categoryId === PRODUCT_CATEGORY_GABLE_CARPORTS);
        const isSkillionShed = (currentProduct && currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_SHEDS);

        if (isSkillionCarport) {
            dataSet = DATASET_WIND_SPEED_SKILLION_CARPORT;
        } else if (isGableCarport) {
            dataSet = DATASET_WIND_SPEED_GABLE_CARPORT;
        } else if (isSkillionShed && hasKneeBrace && !hasCollarTie) {
            dataSet = DATASET_WIND_SPEED_SKILLION_SHED_KNEE_BRACE;
        } else if (isSkillionShed) {
            dataSet = DATASET_WIND_SPEED_SKILLION_SHED;
        } else if (hasKneeBrace && !hasCollarTie) {
            dataSet = DATASET_WIND_SPEED_GABLE_SHED_KNEE_BRACE;
        } else if (hasKneeBrace && hasCollarTie) {
            dataSet = DATASET_WIND_SPEED_GABLE_SHED_KNEE_BRACE_AND_COLLAR_TIE;    
        } else if (["TS96", "TS120" , "Z100", "Z150", "Z200", "Z250"].includes(purlinAndGirtType)) {
            dataSet = DATASET_WIND_SPEED_GABLE_SHED_TS96_TS120;
        } else {
            dataSet = DATASET_WIND_SPEED_GABLE_SHED_TS61_64;
        }
        
        //Temporally bypass MaxBaySpacing constrain because of insufficient database
        let results = dataSet.filter((item) => 
            (!Cpi || item.Cpi === Cpi)
            &&(!MaxShedSpan || item.MaxShedSpan >= MaxShedSpan)
            && (!MaxShedHeight || item.MaxShedHeight >= MaxShedHeight)
            && (!MaxShedLength || item.MaxShedLength >= MaxShedLength)
            //&& (!MaxBaySpacing || item.MaxBaySpacing >= MaxBaySpacing)
            && (!WindSpeedAutoCalc || item.WindSpeedAutoCalc >= WindSpeedAutoCalc));
        //sort by MidColumnMember
        results.sort(function(a, b){return a.MaxShedHeight - b.MaxShedHeight});
        results.sort(function(a, b){return a.MaxShedLength - b.MaxShedLength});
        results.sort(function(a, b){return a.MaxShedSpan - b.MaxShedSpan});
        //results.sort(function(a, b){return a.MaxBaySpacing - b.MaxBaySpacing});
        results.sort(function(a, b){
            if(a.MidColumnMember < b.MidColumnMember) { return -1; }
            if(a.MidColumnMember > b.MidColumnMember) { return 1; }
            return 0;});
        if(results.length > 0){
            obj = results[0];
        }
        //console.log('frame: ', obj);
        return obj;
    },

    findMaxBaySpan(buildingDetails){
        let maxSpan = 0;
        for(let i = 0; i<buildingDetails.bays.length; i++){
            if(maxSpan < buildingDetails.bays[i].actualSize){
                maxSpan = buildingDetails.bays[i].actualSize;
            }
        }
        return parseFloat(maxSpan);
    },

    increaseCount(dict, key, increaseValue){
        let count = increaseValue;
        if(dict[key]){
            count = dict[key] + count;
        }
        dict[key] = count;
        return dict;
    },

    formatCurrencyRaw(num, minimumFractionDigits = 2, maximumFractionDigits = 2){
        return new Intl.NumberFormat('en-US',
            {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits,
                maximumFractionDigits
            }
        ).format(num);
    },

    /**
     * Find the exact wholeSale margin rate from quote value
     *
     * @param wholeSaleMarginDef
     * @param quoteVale
     * @returns {number}
     */
    findProperWholesaleMarginRate(wholeSaleMarginDef, quoteVale) {
        if (!wholeSaleMarginDef || !quoteVale)
            return 0;
        let lastMinValue = -1;
        let marginValue = 0;
        for (let i in wholeSaleMarginDef) {
            let minValue = Number(String(i).replace(/'|'/gi,""));   //-- stupid thing due to encoding of previous code
            if (minValue > lastMinValue && quoteVale > minValue) {
                lastMinValue = minValue;
                marginValue = Number(wholeSaleMarginDef[i]);
            }
        }
        return marginValue;
    },

    /**
     * Find the exact wholeSale margin rate from quote value
     *
     * @param productMarginDef
     * @param productId
     * @returns {number}
     */
    findProperProductMarginRate(productMarginDef, productId) {
        if (!productMarginDef)
            return 0;
        let marginValue = 0;
        for (let i in productMarginDef) {
            let value = Number(String(i).replace(/'|'/gi,""));   //-- stupid thing due to encoding of previous code
            if (value===productId) {
                marginValue = Number(productMarginDef[i]);
            }
        }
        return marginValue;
    },
};

export default utils;