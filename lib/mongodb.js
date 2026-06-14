// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('.env.local 파일에 MONGODB_URI 주소가 없습니다.');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // 개발 모드에서는 서버가 재시작될 때마다 DB에 중복 연결되는 것을 방지합니다.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 실제 배포 환경에서 사용할 연결 방식입니다.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;