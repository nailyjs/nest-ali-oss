import type { DynamicModule, InjectionToken, Provider } from '@nestjs/common'
import { Module } from '@nestjs/common'
import OSS from 'ali-oss'
import { AliOSSService } from './oss.service'

export interface AliOSSMultipleOptions extends OSS.Options {
  provide: InjectionToken
}

export type AliOSSModuleOptions = OSS.Options | AliOSSMultipleOptions[]

export interface AliOSSModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<OSS.Options> | OSS.Options
  inject?: any[]
}

export interface AliOSSModuleAsyncMultipleOptions extends AliOSSModuleAsyncOptions {
  provide: InjectionToken
}

export type AliOSSAsyncModuleOptions = AliOSSModuleAsyncOptions | AliOSSModuleAsyncMultipleOptions[]

@Module({})
export class AliOSSModule {
  public static forRoot(options: AliOSSModuleOptions): DynamicModule {
    const providers: Provider[] = []

    if (Array.isArray(options)) {
      options.forEach(option => providers.push({
        provide: option.provide,
        useFactory: () => new OSS(option),
      }))
    }
    else {
      providers.push({
        provide: AliOSSService,
        useValue: new AliOSSService(options),
      })
    }

    return {
      module: AliOSSModule,
      providers,
      global: true,
      exports: providers,
    }
  }

  public static forRootAsync(options: AliOSSAsyncModuleOptions): DynamicModule {
    const providers: Provider[] = []

    if (Array.isArray(options)) {
      options.forEach(option => providers.push({
        provide: option.provide,
        inject: option.inject,
        useFactory: async (...args: any[]) => {
          const result = await option.useFactory(...args)
          return new OSS(result)
        },
      }))
    }
    else {
      providers.push({
        provide: AliOSSService,
        inject: options.inject,
        useFactory: async (...args: any[]) => {
          const result = await options.useFactory(...args)
          return new AliOSSService(result)
        },
      })
    }

    return {
      module: AliOSSModule,
      providers,
      global: true,
      exports: providers,
    }
  }
}
