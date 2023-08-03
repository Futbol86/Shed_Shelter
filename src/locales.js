import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';

//const SUPPORTED_LOCALES = ['en-US', 'fr-FR', 'vi-VN'];    //-- reserve for later use :-)
const SUPPORTED_LOCALES = ['en-US'];

const DEFAULT_LOCALE = 'en-US';

const LOCALE_ALIASES = {
    'en':       'en-US',
    'en-GB':    'en-US',
    'fr':       'fr-FR',
    'vi':       'vi-VN'
};

const getBrowserLocales = () => {
    const locales = []
        .concat(
            navigator.languages,
            navigator.language,
            navigator.userLanguage,
            navigator.browserLanguage,
            navigator.systemLanguage
        )
        .filter(locale => locale)
        .map(locale => LOCALE_ALIASES[locale] || locale);

    return uniq(locales, null, true);
};

const pickLocale = (proposedLocales) => {
    const browserLocales = getBrowserLocales();

    let result = null;

    for (let i = 0; i < browserLocales.length && result === null; i++) {
        if (proposedLocales.indexOf(browserLocales[i]) !== -1) {
            result = browserLocales[i];
        }
    }

    if (result === null) {
        result = DEFAULT_LOCALE;
    }

    return result;
};

export const localeToUse = pickLocale(SUPPORTED_LOCALES);

export const messages = require(`./locales/${localeToUse}`);

/**
 * Load locale messages data from all modules.
 * - In this version, we load all modules' messages into one single messages object
 * - In the future: COMPARE this method with the method of WRAPPING IntProvider for each module's route
 *
 * @param enabledModules
 */
export const loadLocaleMessages = (enabledModules) => {
    let messages = {};

    try {
        const appMessages = require(`./locales/${localeToUse}`);
        if (!isEmpty(appMessages))
            messages = {
                ...messages,
                ...appMessages
            }
    }
    catch (e) { }

    if (enabledModules)
        enabledModules.forEach(modPath => {
            try {
                const modMessages = require(`./modules/${modPath}/locales/${localeToUse}`);
                if (!isEmpty(modMessages))
                    messages = {
                        ...messages,
                        ...modMessages
                    }
            }
            catch (e) { }

        });

    return messages;
};