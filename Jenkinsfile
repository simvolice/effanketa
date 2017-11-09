pipeline {
  agent {
    node {
      label 'npm install'
    }
    
  }
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