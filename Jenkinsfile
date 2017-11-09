pipeline {
  agent any
  stages {
    stage('npm install') {
      steps {
        sh 'npm i'
      }
    }
  }
  environment {
    DEPLOY = 'prod'
    DEBUG = 'effanketa:*'
  }
}