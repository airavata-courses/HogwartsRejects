package com.users.filter;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class CORSFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        List<String> allowedDomains = new ArrayList<>();
        allowedDomains.add("http://localhost:3000");
        allowedDomains.add("http://localhost:3001");
        allowedDomains.add("http://localhost:5000");

        ((HttpServletResponse)response).addHeader("Access-Control-Allow-Methods", "*");
        ((HttpServletResponse)response).addHeader("Access-Control-Allow-Credentials", "true");
        //((HttpServletResponse)response).addHeader("Access-Control-Expose-Headers", "");

        String requestDomain = ((HttpServletRequest)request).getHeader("Origin");
        if(allowedDomains.contains(requestDomain)) {
            ((HttpServletResponse)response).addHeader("Access-Control-Allow-Origin", requestDomain);
        }

        ((HttpServletResponse)response).addHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {}
}
