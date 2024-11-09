import KeyvRedis from '@keyv/redis';
import { CacheManagerOptions, CacheStore } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import Keyv from 'keyv';

class Store implements CacheStore {
  keyv: Keyv;

  constructor(uri: string) {
    this.keyv = new Keyv(new KeyvRedis({ uri }));
  }

  set<T>(key: string, value: T, ttl?: number): Promise<void> | void {
    this.keyv.set(key, value, ttl);
  }

  get<T>(key: string): Promise<T | undefined> | T | undefined {
    return this.keyv.get(key);
  }

  del?(key: string): void | Promise<void> {
    this.keyv.delete(key);
  }
}

export const getRedisStore = (
  configService: ConfigService,
): CacheManagerOptions => {
  const password = configService.get<string>('CRM_CACHE_PASSWORD');
  const user = configService.get<string>('CRM_CACHE_USER');
  const host = configService.get<string>('CRM_CACHE_HOST');
  const port = configService.get<number>('CRM_CACHE_PORT');

  return {
    store: new Store(`redis://${password}:${user}@${host}:${port}`),
    ttl: 1000 * 60 * 5,
  };
};
