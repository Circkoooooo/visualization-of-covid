import { AreaTree } from './AreaTree';
import { ChinaDayList, DayData } from './ChinaDayList';

export type GlobalData = {
	/**
	 * 世界区域疫情
	 */
	areaTree: AreaTree[],
	/**
	 * 中国每日数据
	 */
	chinaDayList: ChinaDayList[],
	chinaTotal: {
		extData: {
			/**
			 * 新增无症状
			 */
			incrNoSymptom: number,
			/**
			 * 无症状感染
			 */
			noSymptom: number
		},
		today: DayData,
		total: DayData
	},
	lastUpdateTime: string,
	/**
	 * 海外更新时间
	 */
	overseaLastUpdateTime:string
}
