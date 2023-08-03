import React from 'react';
import {PRODUCT_CATEGORY_SKILLION_CARPORTS} from "../../../../../constants";

class RoofsPreview extends React.Component {
    render() {
        const {roofColors0, roofColors1, roofColors2, isSkillionRoof, handleRoofPreviewClick} = this.props;
        return (
            <div className="d-flex justify-content-center">
            <div className="d-flex flex-column justify-content-start" style={{height: '136px', width: '160px'}}>
                <div className="d-flex align-items-center justify-content-center wallPreview"
                     style={
                        !isSkillionRoof ?
                            {height: '55px', border: '1px solid #000000', cursor: 'pointer', backgroundColor: roofColors0} :
                            {height: '110px', border: '1px solid #000000', cursor: 'pointer', backgroundColor: roofColors0}
                    } 
                    onClick={() => handleRoofPreviewClick(0)}
                >
                    <div className="">
                        {!isSkillionRoof ? 'Slope 1' : 'Roof'}
                    </div>
                </div>
                {!isSkillionRoof ?
                <div>
                    <div className="d-flex align-items-center justify-content-center wallPreview"
                        style={{height: '26px', border: '1px solid #000000', cursor: 'pointer', backgroundColor: roofColors1}}
                        onClick={() => handleRoofPreviewClick(1)}
                    >
                        <hr style={{position: 'absolute', top: '68px', width: '160px', margin: '0', color: 'yellowgreen'}} />
                        <div className="">
                            Ridge
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center wallPreview"
                        style={{height: '55px', border: '1px solid #000000', cursor: 'pointer', backgroundColor: roofColors2}}
                        onClick={() => handleRoofPreviewClick(2)}
                    >
                        <div className="">
                            Slope 2
                        </div>
                    </div>
                </div> :
                null
                }
            </div>
            </div>
        )
    }
}

export default RoofsPreview;