export const appUrl = {
  studyRoom: () => ({ url: "/study-room", title: "Study now" }),
  rememberVoca: () => ({ url: "/remember-vocas", title: "Ghi nhớ từ vựng" }),
  rememberVocaWithId: (id) => ({ url: `/remember-vocas/${id}`, title: '' }),
  myVoca: () => ({ url: `/my-vocas`, title: "Từ vựng của tôi" }),
  setVocaDetail: (setId) => ({ url: `/my-vocas/${setId}`, title: "" }),
  testVoca: () => ({ url: `/test-vocas`, title: "Kiểm tra kiến thức" }),
  dashboard: () => ({ url: "/", title: "Trang chủ" }),
  signUp: () => ({ url: "/sign-up", title: "Đăng kí" }),
};
