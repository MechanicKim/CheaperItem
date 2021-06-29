import AsyncStorage from '@react-native-async-storage/async-storage';

export const clear = async () => {
  await AsyncStorage.removeItem('items');
};

export const getItems = async () => {
  const items = await AsyncStorage.getItem('items');
  return items ? JSON.parse(items) : [];
};

export const searchItem = async (keyword) => {
  const items = await getItems();
  return items.filter((item) => {
    return item.name.indexOf(keyword) > -1;
  });
};

export const removeItem = async (id) => {
  const items = await getItems();
  const newItems = items.filter((item) => {
    return item.id !== id;
  });
  await AsyncStorage.setItem('items', JSON.stringify(newItems));
  return newItems;
};

export const getItem = async (id) => {
  const items = await getItems();
  return items.filter((item) => {
    return item.id === +id;
  })[0];
};

export const saveItem = async (item) => {
  const items = await getItems();
  const newItem = {
    id: new Date().getTime(),
    name: item.name,
    marts: [
      {
        id: new Date().getTime(),
        name: item.martName,
        price: +item.price,
        unitValue: +(item.unitValue || 0),
        unit: item.unit,
      },
    ],
  };
  items.push(newItem);
  await AsyncStorage.setItem('items', JSON.stringify(items));
  await saveName('itemNames', item.name);
  await saveName('martNames', item.martName);

  return newItem.id;
};

export const updateItem = async (itemId, itemName, newMart) => {
  const items = await getItems();
  items.some(async (item) => {
    if (item.id !== itemId) {
      return false;
    }

    item.name = itemName;
    if (newMart.id) {
      item.marts.some((mart) => {
        if (mart.id !== newMart.id) {
          return false;
        }
        mart.name = newMart.name;
        mart.price = newMart.price;
        mart.unitValue = newMart.unitValue;
        mart.unit = newMart.unit;
        return true;
      });
    } else {
      newMart.id = new Date().getTime();
      item.marts.push(newMart);
    }

    item.marts.sort((a, b) => {
      return a.price - b.price;
    });

    await saveName('itemNames', itemName);
    await saveName('martNames', newMart.name);

    return true;
  });
  await AsyncStorage.setItem('items', JSON.stringify(items));
};

export const removeMart = async (itemId, martId) => {
  let items = await getItems();
  let result = null;
  items = items.filter((item, index) => {
    if (item.id !== itemId) {
      return true;
    }
    item.marts = item.marts.filter((mart) => {
      return mart.id !== martId;
    });
    result = item;
    return item.marts.length > 0;
  });
  await AsyncStorage.setItem('items', JSON.stringify(items));
  return result;
};

export const saveName = async (key, name) => {
  const names = await AsyncStorage.getItem(key);
  const newNames = names ? JSON.parse(names) : {};
  if (!newNames[name]) {
    newNames[name] = true;
  }
  await AsyncStorage.setItem(key, JSON.stringify(newNames));
};

export const getNames = async (key) => {
  const names = await AsyncStorage.getItem(key);
  const result = names ? JSON.parse(names) : {};
  return Object.keys(result);
};

export const clearSelection = async (selection) => {
  await AsyncStorage.removeItem('selection');
};

export const saveSelection = async (selection) => {
  await AsyncStorage.setItem('selection', JSON.stringify(selection));
};

export const loadSelection = async () => {
  let selection = await AsyncStorage.getItem('selection');
  if (selection) {
    selection = JSON.parse(selection);
  }
  return selection;
};
