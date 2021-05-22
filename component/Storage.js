import Realm from 'realm';
import {ItemPriceSchema, TempSchema, SchemaVersion} from '../component/Schema';

export const open = (callback) => {
  Realm.open({
    schema: [ItemPriceSchema, TempSchema],
    schemaVersion: SchemaVersion,
  }).then((realm) => {
    callback(getItems());
  });
};

export const getItems = () => {
  const realm = new Realm();
  return realm
    .objects('ItemPrice')
    .filtered('TRUEPREDICATE SORT(item ASC, price ASC) DISTINCT(item)');
};

export const getItemsByName = (name) => {
  const realm = new Realm();
  return realm.objects('ItemPrice').filtered(`item='${name}'`).sorted('price');
};

export const getItem = (id) => {
  const realm = new Realm();
  return realm.objects('ItemPrice').filtered(`id='${id}'`)[0];
};

export const saveItem = (item, callback) => {
  const realm = new Realm();
  realm.write(() => {
    realm.create('ItemPrice', {
      id: new Date().getTime(),
      mart: item.mart,
      item: item.name,
      price: parseInt(item.price, 10),
      unitValue: parseInt(item.unitValue || 0, 10),
      unit: item.unit,
    });

    callback();
  });
};

export const updateItem = (item, callback) => {
  const realm = new Realm();
  realm.write(() => {
    const storedItem = realm
      .objects('ItemPrice')
      .filtered(`id='${item.id}'`)[0];
    storedItem.mart = item.mart;
    storedItem.item = item.name;
    storedItem.price = parseInt(item.price, 10);
    storedItem.unitValue = parseInt(item.unitValue || 0, 10);
    storedItem.unit = item.unit;

    callback();
  });
};

export const removeItems = (name, callback) => {
  const realm = new Realm();
  realm.write(() => {
    const items = realm.objects('ItemPrice').filtered(`item='${name}'`);
    realm.delete(items);
    callback(getItems());
  });
};

export const removeItem = (id, callback) => {
  const realm = new Realm();
  realm.write(() => {
    const item = realm.objects('ItemPrice').filtered(`id='${id}'`);
    const name = item[0].item;
    realm.delete(item);
    callback(getItemsByName(name));
  });
};

export const searchItem = (keyword) => {
  return getItems()
    .filtered(`item CONTAINS[c] "${keyword}"`)
    .sorted('item')
    .sorted('price');
};

export const groupBy = (query) => {
  const realm = new Realm();
  return realm
    .objects('ItemPrice')
    .filtered(`TRUEPREDICATE DISTINCT(${query})`);
};

export const setData = (key, value) => {
  const realm = new Realm();
  realm.write(() => {
    let data = realm.objects('Temp').filtered(`key='${key}'`)[0];
    if (!data) {
      realm.create('Temp', {key, value});
    } else {
      data.value = value;
    }
  });
};

export const getData = (key) => {
  const realm = new Realm();
  const data = realm.objects('Temp').filtered(`key='${key}'`)[0];
  if (!data) {
    return null;
  }
  return data.value;
};

export const clearTemp = () => {
  const realm = new Realm();
  realm.write(() => {
    realm.delete(realm.objects('Temp'));
  });
};
