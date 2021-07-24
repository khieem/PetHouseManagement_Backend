export class ReturnDonatorDto {
	id: number;
	name: string;
	phone: string;
	gender: string;
}

export const map2donator = (user) => {
	const { id, name, phone, gender, ...restt } = user;
	return { id, name, phone, gender };
};
