pipeline {
    agent any

    tools {nodejs "nodeJS"}

    stages {

        stage('Checkout repo') {
            steps {
                git branch: 'staging',  url: 'https://github.com/wombolo/andela-store-manager-frontend'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
