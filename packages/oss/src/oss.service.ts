import { Injectable } from '@nestjs/common'
import * as OSS from 'ali-oss'

@Injectable()
export class AliOSSService extends OSS {}
