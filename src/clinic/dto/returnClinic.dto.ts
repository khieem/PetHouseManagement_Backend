export class ReturnClinicDto {
	id: number;
	phone: string;
	name: string;
	gender: string;
	role: string;
	address: string;
	email: string;
	collab: boolean;
	password: string;
	createAt: Date;
	updateAt: Date;
}

export const map2clinic = (user) => {
	const {
		id,
		phone,
		name,
		gender,
		role,
		address,
		email,
		collab,
		password,
		createAt,
		updateAt,
		...rest
	} = user;
	return {
		id,
		phone,
		name,
		gender,
		role,
		address,
		email,
		collab,
		password,
		createAt,
		updateAt,
	};
};
