import { Injectable } from '@nestjs/common'
import OSS from 'ali-oss'

@Injectable()
export class AliOSSService extends OSS {}
