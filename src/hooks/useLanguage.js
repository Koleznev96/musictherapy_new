export const checkLanguage = (field, language) => {
    let data = field?.find(item => item?.language === language);
    if (!data) return ''
    return data.value;
}

export const checkLanguageConst = (value, translations) => {
    return (translations && translations[value]) ? translations[value] : value;
}