export default function inBrowser () {
	//@ts-ignore
	return process.client || process.browser;
}