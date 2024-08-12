# ☁️ ali-oss SDK for nest.js

A aliyun OSS SDK for nest.js.

## Installation

```bash
pnpm i @nailyjs.nest.modules/ali-oss
```

## Usage

```typescript
import { Module } from '@nestjs/common';
import { AliOSSModule } from '@nailyjs.nest.modules/ali-oss';

@Module({
  imports: [
    AliOSSModule.forRoot(/* options */),
  ],
})
export class AppModule {}
```

You can also use `AliOSSModule.forRootAsync` to provide options asynchronously.

```typescript
import { Module } from '@nestjs/common';
import { AliOSSModule } from '@nailyjs.nest.modules/ali-oss';

@Module({
  imports: [
    AliOSSModule.forRootAsync({
      useFactory: () => ({/* options */}),
    }),
  ],
})
export class AppModule {}
```

Then you can use `AliOSSService` to upload files.

```typescript
import { Injectable } from '@nestjs/common';
import { AliOSSService } from '@nailyjs.nest.modules/ali-oss';

@Injectable()
export class AppService {
  constructor(private readonly aliOSSService: AliOSSService) {}
}
```

## Multiple AliOSS Instances

You can create multiple AliOSS instances with different configurations.

```typescript
import { Module } from '@nestjs/common';
import { AliOSSModule } from '@nailyjs.nest.modules/ali-oss';

@Module({
  imports: [
    AliOSSModule.forRoot([
      {
        provide: 'AliOSSInstanceName1',
        /* options */
      },
      {
        provide: 'AliOSSInstanceName2',
        /* options */
      }
    ]),
  ],
})
export class AppModule {}
```

Then you can use `AliOSSService` with a specific name.

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { AliOSSService } from '@nailyjs.nest.modules/ali-oss';

@Injectable()
export class AppService {
  constructor(
    @Inject('AliOSSInstanceName1') private readonly aliOSSService1: AliOSSService,
    @Inject('AliOSSInstanceName2') private readonly aliOSSService2: AliOSSService,
  ) {}
}
```

## Author

👤 **Naily Zero**

## License

MIT
