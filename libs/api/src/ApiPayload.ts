interface IPayload {
	Status:string;
	Code:string;
}
export class ApiPayload implements IPayload {
	Data:any
	Pagination:any
	Status:string
	Code:string
}
