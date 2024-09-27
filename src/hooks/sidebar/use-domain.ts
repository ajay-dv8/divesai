
// this hook is to help us extract logic instead of putting it in one component
// helps for users to create domains by filling and submitting forms with domain info
// and allows to re use this logic in different instances and components

import { onIntegrateDomain } from '@/actions/settings';
import { useToast } from '@/components/ui/use-toast';
import { AddDomainSchema } from '@/schemas/settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadClient } from '@uploadcare/upload-client'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const upload = new UploadClient({
  publicKey : process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY!,
});

export const useDomain = () => {
  const { register, handleSubmit, reset, formState: {errors} } = useForm<FieldValues>(
    { resolver: zodResolver(AddDomainSchema), 
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);

  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathname.split('/').pop())
  }, [pathname]);

  const onAddDomain = handleSubmit(async (values: FieldValues) => {
    setLoading(true)
    const uploaded = await upload.uploadFile(values.image[0]);
    const domain = await onIntegrateDomain(values.domain, uploaded.uuid)

    if (domain) {
      reset()
      setLoading(false)
      toast({
        title: domain.status == 200 ? 'Success' : 'Error',
        description: domain.message,
      })
      router.refresh()
    }
  })

  return {
    register,
    onAddDomain,
    errors,
    loading,
    isDomain,
  }
}