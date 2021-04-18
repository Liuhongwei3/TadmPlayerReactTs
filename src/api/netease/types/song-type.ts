export interface FreeTrialPrivilege {
	resConsumable: boolean;
	userConsumable: boolean;
}

export interface FreeTimeTrialPrivilege {
	resConsumable: boolean;
	userConsumable: boolean;
	type: number;
	remainTime: number;
}

export interface ISongUrl {
	id: number;
	url: string;
	br: number;
	size: number;
	md5: string;
	code: number;
	expi: number;
	type: string;
	gain: number;
	fee: number;
	uf?: any;
	payed: number;
	flag: number;
	canExtend: boolean;
	freeTrialInfo?: any;
	level: string;
	encodeType: string;
	freeTrialPrivilege: FreeTrialPrivilege;
	freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
	urlSource: number;
}

export interface ISongUrlRes {
    data: ISongUrl[];
	code: number;
}
