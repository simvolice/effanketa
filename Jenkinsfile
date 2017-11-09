pipeline {
  agent {
    node {
      label 'test'
    }
    
  }
  stages {
    stage('test') {
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