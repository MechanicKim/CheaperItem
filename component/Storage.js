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
  return newItem.id;
};

export const updateItem = async (itemId, itemName, newMart) => {
  const items = await getItems();
  items.some((item) => {
    if (item.id === itemId) {
      item.name = itemName;
      if (newMart.id) {
        return item.marts.some((mart) => {
          if (mart.id === newMart.id) {
            mart.name = newMart.name;
            mart.price = newMart.price;
            mart.unitValue = newMart.unitValue;
            mart.unit = newMart.unit;
            return true;
          }
          return false;
        });
      } else {
        newMart.id = new Date().getTime();
        item.marts.push(newMart);
        item.marts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
    return false;
  });
  await AsyncStorage.setItem('items', JSON.stringify(items));
};

export const removeMart = async (itemId, martId) => {
  let items = await getItems();
  let target = null;
  items.some((item, index) => {
    if (item.id !== itemId) {
      return false;
    }
    item.marts = item.marts.filter((mart) => {
      return mart.id !== martId;
    });
    target = {
      index,
      ...item,
    };
    return true;
  });

  if (target && target.marts.length === 0) {
    items = items.splice(target.index, 1);
  }
  await AsyncStorage.setItem('items', JSON.stringify(items));
  return await getItem(itemId);
};

export const getItemNames = async () => {
  const items = await getItems();
  return items
    .map((item) => {
      return item.name;
    })
    .sort();
};

export const getMartNames = async () => {
  const items = await getItems();
  const martNames = [];
  items.forEach((item) => {
    item.marts.forEach((mart) => {
      martNames.push(mart.name);
    });
  });
  martNames.sort();
  return martNames;
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
