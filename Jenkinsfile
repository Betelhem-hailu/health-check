pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'betelhemhailu/my-api'
        TAG = 'v1'
        CONTAINER_NAME = 'my-api-container'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                bat """
                docker version
                docker build -t %DOCKER_IMAGE%:%TAG% .
                """
            }
        }

        stage('Run Container (Simulated Deploy)') {
            steps {
                bat """
                docker rm -f %CONTAINER_NAME% 2>NUL
                docker run -d -p 5000:5000 --name %CONTAINER_NAME% %DOCKER_IMAGE%:%TAG%
                """
            }
        }

        stage('Health Check') {
            steps {
                bat """
                timeout /t 5 /nobreak
                curl http://localhost:5000/health
                """
            }
        }
    }

    post {

        success {
            echo 'App is running successfully ✅'
        }

        failure {
            echo 'Health check failed ❌'
            bat """
            docker logs %CONTAINER_NAME%
            """
        }

        always {
            echo 'Cleaning up...'
            bat """
            docker rm -f %CONTAINER_NAME% 2>NUL
            """
        }
    }
}