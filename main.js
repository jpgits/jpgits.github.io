let db;
const DB_NAME = 'MyTestDB';
const DB_VERSION = 1;
const STORE_NAME = 'items';

// データベースを開く
const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  // オブジェクトストアがない場合
  if (!db.objectStoreNames.contains(STORE_NAME)) {
  const objectStore = db.createObjectStore(STORE_NAME, {
    keyPath: 'id',
    autoIncrement: true
  });
 // 必要に応じてインデックスを作成する場合はこちら
  // objectStore.createIndex('name', 'name', { unique: false });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
  console.log('DBを開きました');
  displayItems(); // 初回ロード時に一覧を取得・表示
};

request.onerror = (event) => {
  console.error('DBを開けませんでした', event.target.error);
};

// フォーム送信時にアイテムを追加
document.getElementById('myForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const itemName = document.getElementById('itemName').value;
  if (!itemName) return;
  addItem(itemName);
  document.getElementById('itemName').value = '';
});

// Create（追加）
function addItem(name) {
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  const item = { name: name };
  store.add(item);

  transaction.oncomplete = () => {
    console.log('アイテムが追加されました');
    displayItems();
  };
  transaction.onerror = (event) => {
    console.error('アイテム追加でエラー', event.target.error);
  };
}

// Read（読み込み・一覧表示）
function displayItems() {
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  request.onsuccess = (event) => {
    const items = event.target.result;
    const list = document.getElementById('itemList');
    list.innerHTML = '';

    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.name;

      // 編集ボタン
      const editButton = document.createElement('button');
      editButton.textContent = '編集';
      editButton.onclick = () => {
        const newName = prompt('新しい名前を入力', item.name);
        if (newName) {
          updateItem(item.id, newName);
        }
      };

      // 削除ボタン
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      deleteButton.onclick = () => {
        deleteItem(item.id);
      };

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      list.appendChild(li);
    });
  };
}

// Update（更新）
function updateItem(id, newName) {
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  const getRequest = store.get(id);
  getRequest.onsuccess = (event) => {
    const item = event.target.result;
    item.name = newName;
    store.put(item); // keyPathのidを持つ既存レコードを上書き

    transaction.oncomplete = () => {
      console.log('アイテムが更新されました');
      displayItems();
    };
  };
}

// Delete（削除）
function deleteItem(id) {
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  store.delete(id);

  transaction.oncomplete = () => {
    console.log('アイテムが削除されました');
    displayItems();
  };
}
