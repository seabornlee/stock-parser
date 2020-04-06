def npm_registry = 'https://registry.npm.taobao.org'

DEPLOY_CREDENTIALS_ID = "deploy-aliyun"
ARTIFACTS_CREDENTIALS_ID = "seabornlee-dockerhub"
dockerServer = "" // Docker Hub, useful when use private registry
artifactName = "stock-parser"
imageName = "hkliya/${artifactName}"

pipeline {
  agent any 

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Deploy') {
      when {
        branch 'production'
      }

      stages {
        stage('Build Docker Image') {
          steps {
            script {
              version = sh label: 'get version', returnStdout: true, script: '''grep \'version\' package.json | cut -d \'"\' -f4 | tr \'\\n\' \'\\0\'
'''
              echo "Current package version: $version"
              imageName = "${imageName}:${version}"
              docker.build(imageName)
            }
          }
        }

        stage('Push Docker Image') {
          steps {
            script {
              withDockerRegistry(credentialsId: ARTIFACTS_CREDENTIALS_ID) {
                docker.image(imageName).push()
              }
            }
          }
        }

        stage('Update Image') {
          steps {
            script {
              def remote = [:]
              remote.name = 'web-server'
              remote.allowAnyHosts = true
              remote.host = 'codingstyle.cn'
              remote.user = 'ruby'

              dockerUser = ""
              dockerPassword = ""

              // 获取内置的制品库凭证
              withCredentials([usernamePassword(credentialsId: ARTIFACTS_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                dockerUser = DOCKER_USER
                dockerPassword = DOCKER_PASSWORD
              }

              // 需要先创建一对密钥，把私钥放在 CODING 凭据管理，把公钥放在服务器的 `.ssh/authorized_keys`，实现 SSH 免密码登录
              withCredentials([sshUserPrivateKey(credentialsId: DEPLOY_CREDENTIALS_ID, keyFileVariable: 'id_rsa')]) {
                remote.identityFile = id_rsa

                // SSH 连接到远端服务器，拉取 Docker 镜像
                sshCommand remote: remote, command: "docker login -u ${dockerUser} -p ${dockerPassword} ${dockerServer}"
                sshCommand remote: remote, command: "docker pull ${imageName}"
                sshCommand remote: remote, command: "docker stop ${artifactName} | true"
                sshCommand remote: remote, command: "docker rm ${artifactName} | true"
                sshCommand remote: remote, command: "docker run --name ${artifactName} -p 5000:80 -v /data/stocks/:/usr/src/app/data/ -d ${imageName}"
              }
            }
          }
        }
      }
    }
  }
}
