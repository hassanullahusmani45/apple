import i18n from "../i18n";

export function localizedNumber(count: number) {
    return i18n.language === "dr"
        ? new Intl.NumberFormat("fa-IR").format(count)
        : count;
}