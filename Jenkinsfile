pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Betelhem-hailu/health-check.git'
        DOCKER_IMAGE = 'betelhemhailu/my-api'
        TAG = 'v1'
        CONTAINER_NAME = "my-api-container"
    }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${TAG} ."
                }
            }
        }

        stage('Run Container (Simulated Deploy)') {
            steps {
                script {
                    sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d -p 5000:5000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:${TAG}
                    """
                }
            }
        }
        stage('Health Check') {
            steps {
                script {
                    sh """
                    sleep 5
                    curl -f http://localhost:5000/health
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'App is running successfully ✅'
        }

        failure {
            echo 'Health check failed ❌'
            sh "docker logs ${CONTAINER_NAME} || true"
        }

        always {
            echo 'Cleaning up...'
            sh "docker rm -f ${CONTAINER_NAME} || true"
        }
    }
}