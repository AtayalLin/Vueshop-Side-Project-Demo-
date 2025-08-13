// Local products service (static for demo)
// Can be swapped to API later

export const PRODUCTS = [
  { id: 1, name: "日式風格杯子", price: 350, emoji: "🍵" },
  { id: 2, name: "手工茶壺", price: 680, emoji: "🫖" },
  { id: 3, name: "原木餐盤", price: 420, emoji: "🍽️" },
  { id: 4, name: "和風布巾", price: 290, emoji: "🧣" },
  { id: 5, name: "日式便當盒", price: 550, emoji: "🍱" },
  { id: 6, name: "招財貓擺飾", price: 720, emoji: "🐱" },
  { id: 7, name: "竹製筷子組", price: 180, emoji: "🥢" },
  { id: 8, name: "和風燈籠", price: 980, emoji: "🏮" },
  { id: 9, name: "日本抹茶粉", price: 460, emoji: "🌿" },
  { id: 10, name: "風呂敷布包", price: 360, emoji: "🎁" },
  { id: 11, name: "日式茶道組", price: 1250, emoji: "🧉" },
  { id: 12, name: "陶瓷花瓶", price: 640, emoji: "🏺" },
  { id: 13, name: "日式桌墊", price: 280, emoji: "🪑" },
  { id: 14, name: "京都手工香", price: 580, emoji: "🕯️" },
  { id: 15, name: "和風漆器碗", price: 530, emoji: "🥣" },
  { id: 16, name: "手作木托盤", price: 390, emoji: "🪵" },
]

export function listProducts(){
  return PRODUCTS
}

