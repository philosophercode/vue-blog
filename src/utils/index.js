import showdown from "showdown";
const converter = new showdown.Converter();
converter.setFlavor("github");

export const mdToHtml = (text) => converter.makeHtml(text);

export const dateFormat = (dateStr) => new Date(dateStr).toDateString();
