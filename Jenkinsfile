def npm_registry = 'https://registry.npm.taobao.org'

heathCheckURL = "http://stock.codingstyle.cn/code/xml"
DEPLOY_CREDENTIALS_ID = "txy"
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
        script {
          sh 'npm install'
          version = sh label: 'get version', returnStdout: true, script: '''grep \'version\' package.json | cut -d \'"\' -f4 | tr \'\\n\' \'\\0\'
  '''
          echo "Current package version: $version"
        }
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
              docker.build("${imageName}:${version}")
            }
          }
        }

        stage('Push Docker Image') {
          steps {
            script {
              withDockerRegistry(credentialsId: ARTIFACTS_CREDENTIALS_ID) {
                docker.image("${imageName}:${version}").push()
              }
            }
          }
        }

        stage('Get running verison') {
          steps {
            script {
              runningVersion = getRunningVersion()
              echo "Current running verision is: ${runningVersion}"
            }
          }
        }

        stage('Update Image') {
          steps {
            script {
              deployVersion(imageName, version)
              sleep 5 // wait for the application bootstrap
            }
          }
        }

        stage('Rollback') {
          when {
            expression { return serviceNotHeathy(heathCheckURL) && runningVersion != '' }
          }

          steps {
            script {
              deployVersion(imageName, runningVersion)
            }
          }
        }
      }
    }
  }
}

Boolean serviceNotHeathy(url) {
  String command = "curl -m 3 -s --head --request GET ${url} | grep 200"
  try {
    return executeSSHCommands([command]) == ''
  } catch (Exception ex) {
    return true
  }
}

String getRunningVersion() {
  try {
    String command = "docker container ls | grep hkliya/stock-parser | awk -F '[ ]+' '{print \$2}' | cut -d':' -f 2"
    return executeSSHCommands([command])
  } catch (Exception ex) {
    return ''
  }
}

// 需要先创建一对密钥，把私钥放在 CODING 凭据管理，把公钥放在服务器的 `.ssh/authorized_keys`，实现 SSH 免密码登录
String executeSSHCommands(commands) {
  def remote = [:]
  remote.name = 'web-server'
  remote.allowAnyHosts = true
  remote.host = 'stock.codingstyle.cn'
  remote.user = 'ansible'

  String result
  withCredentials([sshUserPrivateKey(credentialsId: DEPLOY_CREDENTIALS_ID, keyFileVariable: 'id_rsa')]) {
    remote.identityFile = id_rsa
    commands.each {
      result = sshCommand remote: remote, command: it, sudo: true
    }
  }
  return result
}

void deployVersion(imageName, version) {
  def commands = []

  artifactName = imageName.split("/")[1]
  commands.add("docker login --username=\$DOCKER_USER --password=\$DOCKER_PASSWORD ${dockerServer}")
  commands.add("docker pull ${imageName}:${version}")
  commands.add("docker stop ${artifactName} | true")
  commands.add("docker rm ${artifactName} | true")
  commands.add("docker run --name ${artifactName} -p 5000:80 -v /data/stocks/:/usr/src/app/data/ -d ${imageName}:${version}")

  executeSSHCommands(commands)
}
