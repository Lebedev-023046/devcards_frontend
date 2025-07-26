export interface AuthRequestDto {
	name?: string;
	email: string;
	password: string;
}
export interface AuthResponseDto {
	access_token: string;
}
