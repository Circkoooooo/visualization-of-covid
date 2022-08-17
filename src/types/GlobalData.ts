type Trend = {
	cure_cnt: number,
	day: string,
	die_cnt: number,
	doubt_cnt: number,
	fullday: number,
	sure_cnt:number
}

export type GlobalData = {
	trend: Trend[],
	incTrend:Trend[]
}
