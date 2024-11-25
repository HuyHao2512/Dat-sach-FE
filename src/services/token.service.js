class TokenService {
  // Lấy refreshToken từ localStorage
  getLocalRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  // Lấy accessToken từ localStorage
  getLocalAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // Cập nhật accessToken trong localStorage
  updateLocalAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }
}

export default new TokenService();
