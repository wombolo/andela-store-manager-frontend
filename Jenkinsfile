pipeline {
    agent { docker { image 'node:10.15.1' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
