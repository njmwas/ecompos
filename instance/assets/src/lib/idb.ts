/**
 * IndexedDB Library for CRUD Operations in Dynamic Collections
 */
import { v4 as uuidv4 } from 'uuid';

export class IndexedDBLibrary {
  private dbName: string;
  private db: IDBDatabase | null;

  constructor(dbName: string) {
    this.dbName = dbName;
    this.db = null;
  }

  /**
   * Initialize the database
   * @param {string[]} collections - List of initial object store names
   * @returns {Promise<void>}
   */
  async init(collections: string[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        collections.forEach((collection) => {
          if (!db.objectStoreNames.contains(collection)) {
            db.createObjectStore(collection, { keyPath: 'id' });
          }
        });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);
    });
  }

  /**
   * Automatically add a new collection when detected
   * @param {string} collectionName - Name of the new collection
   * @returns {Promise<void>}
   */
  private async autoAddCollection(collectionName: string): Promise<void> {
    if (this.db && !this.db.objectStoreNames.contains(collectionName)) {
      await this.addCollection(collectionName);
    }
  }

  /**
   * Add a new collection (object store)
   * @param {string} collectionName - Name of the collection
   * @returns {Promise<void>}
   */
  async addCollection(collectionName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not initialized"));
      }

      const version = this.db.version + 1;
      this.db.close();

      const request = indexedDB.open(this.dbName, version);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(collectionName)) {
          db.createObjectStore(collectionName, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);
    });
  }

  /**
   * Create a record
   * @param {string} collectionName - Collection to insert into
   * @param {Object} data - Data to insert
   * @returns {Promise<string>} - UUID of the inserted record
   */
  async create(collectionName: string, data: Record<string, any>): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not initialized"));
      }

      await this.autoAddCollection(collectionName);

      const transaction = this.db.transaction([collectionName], 'readwrite');
      const store = transaction.objectStore(collectionName);

      const id = uuidv4();
      const record = { ...data, id, synced: false };
      const request = store.add(record);

      request.onsuccess = () => resolve(id);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }
  
  /**
   * Upsert a record (Insert or Update)
   * @param {string} collectionName - Collection to upsert into
   * @param {Object} data - Data to upsert (must include UUID for existing records)
   * @returns {Promise<string>} - UUID of the upserted record
   */
  async upsert(collectionName: string, data: Record<string, any>): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not initialized"));
      }

      await this.autoAddCollection(collectionName);

      const transaction = this.db.transaction([collectionName], 'readwrite');
      const store = transaction.objectStore(collectionName);

      const id = data.id || uuidv4();
      const record = { ...data, id, synced: false };
      const request = store.put(record);

      request.onsuccess = () => resolve(id);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  /**
   * Read a record by ID
   * @param {string} collectionName - Collection to read from
   * @param {string} id - UUID of the record
   * @returns {Promise<Object>} - The record
   */
  async read(collectionName: string, id: string): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not initialized"));
      }

      await this.autoAddCollection(collectionName);

      const transaction = this.db.transaction([collectionName], 'readonly');
      const store = transaction.objectStore(collectionName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  /**
   * Update a record
   * @param {string} collectionName - Collection to update
   * @param {Object} data - Updated data (must include UUID)
   * @returns {Promise<void>}
   */
  async update(collectionName: string, data: Record<string, any>): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not initialized"));
      }

      await this.autoAddCollection(collectionName);

      const transaction = this.db.transaction([collectionName], 'readwrite');
      const store = transaction.objectStore(collectionName);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  /**
   * Delete a record by ID
   * @param {string} collectionName - Collection to delete from
   * @param {string} id - UUID of the record
   * @returns {Promise<void>}
   */
  async delete(collectionName: string, id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not initialized"));
      }

      await this.autoAddCollection(collectionName);

      const transaction = this.db.transaction([collectionName], 'readwrite');
      const store = transaction.objectStore(collectionName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  /**
   * Read all records in a collection
   * @param {string} collectionName - Collection to read from
   * @returns {Promise<Array<Object>>} - Array of all records
   */
  async readAll(collectionName: string): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not initialized"));
      }

      await this.autoAddCollection(collectionName);

      const transaction = this.db.transaction([collectionName], 'readonly');
      const store = transaction.objectStore(collectionName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  /**
   * Sync data with an online database via an API
   * @param {string} collectionName - Collection to sync
   * @param {string} apiUrl - API endpoint URL
   * @returns {Promise<void>}
   */
  async sync(collectionName: string, apiUrl: string): Promise<void> {
    if (!this.db) {
      throw new Error("Database not initialized");
    }

    try {
      const localData = await this.readAll(collectionName);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: localData }),
      });

      if (!response.ok) {
        throw new Error(`Failed to sync: ${response.statusText}`);
      }

      console.log(`Successfully synced ${collectionName} data with the server.`);
    } catch (error) {
      console.error("Error during sync:", error);
    }
  }
}

// Example Usage
/* (async () => {
  const db = new IndexedDBLibrary('DynamicCollectionsDB');
  await db.init(['users', 'products']);

  // Create a record
  const userId = await db.create('users', { name: 'John Doe', email: 'john@example.com' });
  console.log('User ID:', userId);

  // Read a record
  const user = await db.read('users', userId);
  console.log('User:', user);

  // Update a record
  await db.update('users', { id: userId, name: 'Jane Doe', email: 'jane@example.com' });

  // Read all records
  const users = await db.readAll('users');
  console.log('All Users:', users);

  // Sync data with an online database
  await db.sync('users', 'https://example.com/api/sync');

  // Delete a record
  await db.delete('users', userId);
})(); */
