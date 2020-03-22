package org.iu.ads.processor.filter;

import org.junit.Assert;
import org.junit.Test;
import org.mockito.Mockito;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestCORSFilter {

    @Test
    public void testAllowedDomains() {
        String requestDomain = "http://localhost:3000";
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);

        Mockito.when(request.getHeader("Origin")).thenReturn(requestDomain);

        try {
            new CORSFilter().doFilter(request, response, Mockito.mock(FilterChain.class));
            Mockito.verify(response).addHeader("Access-Control-Allow-Origin", requestDomain);
        } catch (Exception e) {
            Assert.fail();
        }
    }
}
