import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

// 将axios封装到类中
class xwlRequest {
  instance: AxiosInstance // axios的实例将被保存到这里
  constructor(config: AxiosRequestConfig) {
    // 构造器里的config包括baseURL，timeout等
    this.instance = axios.create(config) // 创建axios实例
    this.instance.interceptors.request.use(
      // 实例中的请求拦截器
      (config: any) => {
        // 请求成功的拦截
        const token = localStorage.getItem('token')
        if (token) {
          config.headers = {
            Authorization: `${token}`,
          }
        }
        return config
      },
      (error) => {
        // 请求失败的拦截
        return Promise.reject(error)
      },
    )
    this.instance.interceptors.response.use(
      // 实例中的响应拦截器
      (response: AxiosResponse) => {
        // 响应成功的拦截
        const res: any = response.data
        return res
      },
      (error) => {
        // 响应失败的拦截
        return Promise.reject(error)
      },
    )
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    // 再次封装request方法
    return new Promise((resolve, reject) => {
      this.instance
        .request<any>(config)
        .then((res: any) => {
          resolve(res) // 将结果返回出去
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default xwlRequest
