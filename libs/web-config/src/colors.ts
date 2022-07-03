export const chartColors = {
	purple: '#BC49FF',
	blue: '#2EA0EE',
	red: '#FF6182',
	yellow: '#FFCF49',
	gray: 'rgba(179, 181, 198, 1)',
	red1: '#F44336',
	pink: '#E91E63',
	pink1: '#C51162',
	purple1: '#7B1FA2',
	purple2: '#673AB7',
	purple3: '#6200EA',
	blue1: '#3F51B5',
	blue2: '#1E88E5',
	blue3: '#2962FF',
	blue4: '#0288D1',
	blue5: '#304FFE',
	green: '#0097A7',
	green1: '#009688',
	green2: '#43A047',
	green3: '#558B2F',
	green4: '#AFB42B',
	green5: '#006064',
	yellow1: '#F9A825',
	orange: '#FF6F00',
	orange1: '#E65100',
	orange2: '#F4511E',
	orange3: '#FF3D00',
	brown: '#795548',
	gray1: '#9E9E9E',
	gray2: '#607D8B',
}
export const chartColorsArray = [] as string[]
// Chart Colors
for (const key in chartColors) {
	if (!chartColors.hasOwnProperty(key)) continue
	const colorValue = chartColors[key] as string
	chartColorsArray.push(colorValue)
}
export const colors = {
	brandPrimary: '#F96C30',
	brandSuccess: '#39CE7B',
	brandInfo: '#64335D',
	brandWarning: '#FFC63A',
	brandDanger: '#F94D30',
	darkGray: '#455A65',
}
