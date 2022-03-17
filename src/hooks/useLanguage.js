export const checkLanguage = (field, language) => {
    return field?.find(item => item.language === language).value;
}