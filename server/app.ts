import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import cors from 'cors';
import { connect, connection } from 'mongoose';
import passport from './configuration';
import { UserRepository } from './repository/user.repository';
import { IUserModel } from './IModel/user.imodel';
import { swaggerConfig } from './swagger';
import fs from 'fs';

import child_process from 'child_process';

// const childProcess = require('child_process');

const app = express();
const port = 8080

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(passport.initialize());
app.use(express.static(path.join(process.cwd(), 'public')));
const customJs = '/custom.js';

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerDoc, { customJs: '/custom.js', swaggerOptions: swaggerConfig.swaggerOption }));

app.use('/swagger/oauth2-redirect.html', swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerDoc, { customJs: '/custom.js', swaggerOptions: swaggerConfig.swaggerOption }));

app.get('/oauth2-redirect.html', function (req: Request, res: Response) {
  res.redirect('/swagger/oauth2-redirect.html');
});


const verifyTokenAndRole = (authRole: Array<string>) =>
  (req: Request, res: Response, next: Function) => {
    console.log(req.user);
    next();
  }


const connectToDb = async () => {
  connection.on('open', () => {
    console.info('Connected to Mongo.');
  });
  connection.on('error', (err: any) => {
    console.error("Error While connecting to DB");
  });
  try {
    await connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {

  }
}

// connectToDb();

app.get('/api', passport.authenticate('oauth-bearer', { session: false }), verifyTokenAndRole(['ADMIN']), function (req, res) {
  res.send('Hello World API');
});

let number = 5000;
let version = 0;

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World ' + req.query['index']);
});


const controller = async (req: Request, res: Response) => {
  await updateData(parseInt(req.query['index'] as string));
  res.send('Hello World ' + req.query['index']);
}

app.get('/test', controller);

let currentVersion: number = 0;
const timer = 20;

const updateData = async (index: number): Promise<void> => {
  const currentVersion = await getCurrentVersion();
  const latestVersion = currentVersion + 1;
  const s3FileName = "file_" + latestVersion + ".pdf";
  const seResult = await uploadFileToS3(currentVersion, s3FileName);
  console.log("S3 Result", seResult)
  setCurrentVersion(latestVersion);
  console.log("RequestNumber: ", index, ", LastVersion: ", currentVersion, ", LatestVersion: ", latestVersion);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
}

const getCurrentVersion = async (): Promise<number> => {
  return currentVersion;
}

const setCurrentVersion = async (version: number): Promise<void> => {
  currentVersion = version;
}

const uploadFileToS3 = async (currentVersion: number, s3Filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(s3Filename);
    }, (timer - currentVersion) * 1000);
  })
}









const test4 = async (index: any): Promise<void> => {
  if (index == 1) {
    await test0(index);
  } else {
    await test5(index);
  }
}

const test0 = async (index: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(index, version)
      version++;
      resolve();
    }, 0);
  })
}

const test5 = async (index: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(index, version)
      version++;
      resolve();
    }, 5000);
  })
}


const test2 = async (index: any): Promise<void> => {
  console.log("income", index)
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      await testFunction(index)
      resolve();
    }, number);
    number = 0;
  })
}

const testFunction = async (index: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(index, version)
      version++;
      resolve();
    }, 0);
  })
}

app.get('/users', function (req: Request, res: Response) {
  const userRepository = new UserRepository();
  userRepository.retrieve({}).then((users: any) => {
    res.status(200).json(users);
  }).catch((error: Error) => {
    res.status(500).json(error);
  });
});

app.post('/user', function (req: Request, res: Response) {
  const userRepository = new UserRepository();
  const userModel = <IUserModel>{ ...req.body, createdAt: new Date(), updatedAt: new Date() };
  userRepository.create(userModel).then((user: any) => {
    res.status(200).json(user);
  }).catch((error: Error) => {
    res.status(500).json(error);
  });
});

app.delete('/user/:userId', function (req: Request, res: Response) {
  const userRepository = new UserRepository();

  const userId = req.params.userId;
  userRepository.delete(userId).then((deleted: number) => {
    res.status(200).json(deleted);
  }).catch((error: Error) => {
    res.status(500).json(error);
  });
});

const server = app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`)
});

declare const module: any;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}