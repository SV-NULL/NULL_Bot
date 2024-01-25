const DEVELOPER_IDS = [
	"417757128187445249"
];

const COLORS = {
	ERROR: "f42525",
	RED: "#ff0000",
	YELLOW: "ffc400",
	GREEN: "00FF00",
	BLACK: "000000",
	CYAN: "00ffdd",

	KubeXColor: "#0bc0d6",
	noColor: "#2f3136",
	Blue: "#4991DC",
	Aqua: "#48E0B9",

	Success: "#198754",
	Warning: "#ffff00",
	Danger: "#ff0000",

	GoldSpecial: "#ffff00",
	SuperDuperMoowjePaarseKleur: "#a30ace"
};

const MESSAGES = {
	ERROR: "An error has occurred",
	PERMISSION_DENIED: "You do not have the required permissions",
};

/**
 * 
 * @param {Number} seconds the amount of seconds to add up to current timestamp
 * @param {'t'|'T'|'d'|'D'|'F'|'R'} format ```
		`t`: Short Time (e.g 9:41 PM)
		`T`: Long Time (e.g 9:41:30 PM)
		`d`: Short Date (e.g 01/01/2000)
		`D`: Long Date (e.g 01 January 2000)
		`f` (default): Short Date/Time (e.g 01 January 2000 9:41 PM)
		`F`: Long Date/Time (e.g Saturday, January, 01, 2000 9:41 PM)
		`R`: Relative Time (e.g 22 years ago)
	```
 * @param {Number} now Date.now() by default
 */
function generate_discord_time_format(
	seconds = 0,
	format = "f",
	now = Date.now()
) {
	return `<t:${Math.floor(now / 1000) + seconds}:${format}>`;
}

module.exports = {
	COLORS,
	DEVELOPER_IDS,
	MESSAGES,

	generate_discord_time_format
};
