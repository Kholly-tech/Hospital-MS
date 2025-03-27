import axios from 'axios';
import Cookies from 'js-cookie';

let serverUrl;

if(process.env.NODE_ENV === 'development') {
    serverUrl = 'http://localhost:8000'
} else {
    serverUrl = 'https://your-production-url.com'
}
export const apiUrl = `${serverUrl}/api/v1`;

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

const setUpAxiosInterceptors = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = Cookies.get('token');
            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if(error.response && error.response.status === 401  && !originalRequest._retry) {
                try {
                    let newToken;
                    // const newToken = await refreshAccessToken();
                    originalRequest._retry = true;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                } catch (error) {
                    Cookies.remove('token');
                    Cookies.remove('refresh_token');
                    window.location.href = '/signin';
                    return Promise.reject(error);
                }
            }

            return Promise.reject(error);
        }
    );
}

setUpAxiosInterceptors();



export const getDataAPI = async (url, onProgress) => {
    try {
      const res = await axiosInstance.get(url, {
        onDownloadProgress: onProgress,
      });
      return res.data;
    } catch (error) {
      // console.error("Error fetching data:", error);
      throw error.response.data;
    }
  };
  
  export const postDataAPI = async (url, post, onProgress) => {
    try {
      const res = await axiosInstance.post(url, post, {
        onUploadProgress: onProgress,
      });
      return res.data;
    } catch (error) {
      // console.error("Error posting data:", error);
      throw error.response.data;
    }
  };
  
  export const putDataAPI = async (url, post, onProgress) => {
    try {
      const res = await axiosInstance.put(url, post, {
        onUploadProgress: onProgress,
      });
      return res.data;
    } catch (error) {
      // console.error("Error updating data:", error);
      throw error.response.data;
    }
  };
  
  export const patchDataAPI = async (url, post, onProgress) => {
    try {
      const res = await axiosInstance.patch(url, post, {
        onUploadProgress: onProgress,
      });
      return res.data;
    } catch (error) {
      // console.error("Error patching data:", error);
      throw error.response.data;
    }
  };
  
  export const deleteDataAPI = async (url, onProgress) => {
    try {
      const res = await axiosInstance.delete(url, {
        onDownloadProgress: onProgress,
      });
      return res.data;
    } catch (error) {
      // console.error("Error deleting data:", error);
      throw error.response.data;
    }
  };

  export const postMediaAPI = async (url, post, onProgress) => {
    try {
      const res = await axiosInstance.post(url, post, {
        headers: { "Content-Type": "multipart/form-data",
            'Accept': 'application/json',
         },
        onUploadProgress: onProgress,
      });
      return res.data;
    } catch (error) {
      console.error("Error posting media:", error);
      throw error.response.data;
    }
  };


export default serverUrl;