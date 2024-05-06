export const resetPasswordTemplate = (body: any) => {
	return `<div>Bạn có yêu cầu lấy lại mật khẩu</div><div>Vui lòng xác nhận <a href="${body.url}">Tại đây</a></div><h3>Nếu không phải bạn, vui lòng bỏ qua!</h3>`;
};
