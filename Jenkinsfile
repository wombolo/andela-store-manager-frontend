pipeline {
    agent any

    tools {
        nodejs "nodeJS"
    }

    stages {

        stage('Clone repo') {
            steps {
                git branch: 'staging',  url: 'https://github.com/wombolo/andela-store-manager-frontend'
            }
        }



        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }



        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }
    }
}
