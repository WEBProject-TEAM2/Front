const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.get('/api/restaurants', async (req, res) => {
    const { lat, lng, radius } = req.query;

    try {
        const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            params: {
                query: '음식점',
                x: lng,
                y: lat,
                radius: radius
            },
            headers: {
                'Authorization': 'KakaoAK 7ff114c5b5a89e0dd018479788b92514'  // 카카오에서 발급받은 REST API 키로 대체
            }
        });

        const restaurants = response.data.documents.map(place => ({
            name: place.place_name,
            rating: place.rating || 'N/A',  // 별점 정보는 카카오 API에서 직접 제공하지 않으므로 다른 데이터 소스를 참고해야 할 수 있음
            address: place.road_address_name || place.address_name,
            reviewCount: place.review_count || 'N/A',  // 리뷰 갯수 정보도 직접 제공하지 않음
            category: place.category_name
        }));

        res.json(restaurants);
    } catch (error) {
        console.error('Error response from Kakao API:', error.response.data);
        res.status(error.response.status).send(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
