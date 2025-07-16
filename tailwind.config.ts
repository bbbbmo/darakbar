// tailwind.config.js
import flowbiteReact from "flowbite-react/plugin/vite";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 프로젝트 파일 경로에 맞게 수정
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // flowbite-react 사용 시 추가
  ],
  theme: {
    extend: {
      colors: {
        // 커스텀 색상 추가
        primary: "#1e293b",
        secondary: "#64748b",
        mycolor: "#ff6600",
      },
    },
  },
  plugins: [flowbiteReact()],
};
