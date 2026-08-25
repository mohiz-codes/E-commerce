const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    const headers = { 
        "Content-Type": "application/json",
        ...(options?.headers || {}) 
    };
    if (auth?.token) {
        headers.Authorization = `Bearer ${auth.token}`;
    }
    
    let response;
    try {
        response = await fetch(`${API_URL}${path}`, { ...options, headers });
    } catch (networkErr) {
        throw new Error("Unable to connect to server. Please check your connection.");
    }

    if (!response.ok) {
        let errorMessage = "Request failed";
        try {
            const errData = await response.json();
            if (errData?.message) errorMessage = errData.message;
        } catch {
            // response was not json
        }
        throw new Error(errorMessage);
    }

    return response.json();
}

export function signup(data) {
    return request("/auth/signup", { method: "POST", body: JSON.stringify(data) });
}

export function login(data) {
    return request("/auth/login", { method: "POST", body: JSON.stringify(data) });
}

export function getMe() {
    return request("/auth/me");
}

export function getOrders() {
    return request("/orders");
}

export function getProducts(params = "") {
    return request(`/products${params}`);
}

export function getProduct(id) {
    return request(`/products/${id}`);
}

export function getRecommendations(id) {
    return request(`/products/${id}/recommendations`);
}

export function getProductReviews(productId) {
    return request(`/reviews/product/${productId}`);
}

export function getReviews() {
    return request("/reviews");
}

export function createReview(review) {
    return request("/reviews", {
        method: "POST",
        body: JSON.stringify(review)
    });
}

export function createOrder(order) {
    return request("/orders", {
        method: "POST",
        body: JSON.stringify(order)
    });
}
