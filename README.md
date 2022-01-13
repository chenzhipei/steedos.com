# Tailwind CSS Documentation

Tailwind CSS uses [Next.js](https://nextjs.org/) for its documentation. Here is how you can run the project locally:

1. Clone this repo

    ```sh
    git clone https://github.com/tailwindlabs/tailwindcss.com.git
    ```

2. Go into the project root directory

    ```sh
    cd tailwindcss.com
    ```

3. Install JS dependencies

    ```sh
    yarn
    ```

4. Start the dev server

    ```sh
    yarn dev
    ```

### 打包成docker镜像

1、yarn

2、执行build

```
yanr build
```

3、执行docker build

```
docker build -t steedos/yinlian.com:0.0.5 .
```

注意：-t 参数后加上需要打包成的镜像名（registry/name:tag）

4、push

打包后，会在本地生成image，需要手动推送到百度云仓库或者docker hub