export const grammar = `
<grammar root="quote">
   <rule id="quote">
      <one-of>
         <item>to do is to be<tag>out.quote_by="socrates";</tag></item>
         <item>to be is to do<tag>out.quote_by="sartre";</tag></item>
         <item>do be do be do<tag>out.quote_by="sinatra";</tag></item>
      </one-of>
   </rule>
</grammar>
`
