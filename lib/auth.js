import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@elv8s.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD;

export async function signSession(payload) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24; // 24 hours

    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(SECRET_KEY);
}

export async function verifySession(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function verifyCredentials(email, password) {
    console.log("Verifying credentials for:", email);
    console.log("Expected Admin Email:", ADMIN_EMAIL);
    console.log("Has Password Hash?", !!ADMIN_PASSWORD_HASH);

    if (email !== ADMIN_EMAIL) {
        console.log("Email mismatch");
        return false;
    }

    // If no hash is set, fail secure (or allow default for dev if needed, but better to fail)
    if (!ADMIN_PASSWORD) {
        console.log("No password hash configured");
        return false;
    }
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log("Password valid?", isValid);
    return isValid;
}
