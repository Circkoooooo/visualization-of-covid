export type DayData = {
	/**
	 * 现有确诊
	 */
	confirm: number,
	/**
	 * 死亡
	 */
	dead: number,
	/**
	 * 痊愈
	 */
	heal: number,
	/**
	 * 境外输入
	 */
	input: number,
	/**
	 * 重症
	 */
	severe: number,
	/**
	 * 累计确诊（不需要用这个）
	 */
	storeConfirm: number,
	/**
	 * 疑似
	 */
	suspect:number
}

export type ChinaDayList = {
	date: string,
	extData: any,
	lastUpdateTime: string,
	today: DayData
	total:DayData
}
